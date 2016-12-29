import {
  Component,
  Input,
  Output,
  ElementRef,
  ViewChild,
  Optional,
  EventEmitter,
  NgZone,
  forwardRef,
  Renderer,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * CKEditor component.
 * Usage :
 *  <lacackeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
  selector: 'lacackeditor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LacaCKEditorComponent),
      multi: true
    }
  ],
  template: `<textarea #host></textarea>`,
})
export class LacaCKEditorComponent {

  @Input() config: any;
  @Input() debounce: any;

  @Output() change = new EventEmitter();
  @Output() ready = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  @ViewChild('host') host: any;

  _value = '';
  instance: any;
  debounceTimeout: any;
  zone: any;

  /**
   * Constructor
   */
  constructor(zone:NgZone) {
    this.zone = zone;
  }

  get value(): any { return this._value; };
  @Input() set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  /**
   * On component destroy
   */
  ngOnDestroy() {
    if (this.instance) {
      setTimeout(() => {
        this.instance.removeAllListeners();
        this.instance.destroy();
        this.instance = null;
      });
    }
  }

  /**
   * On component view init
   */
  ngAfterViewInit() {
    // Configuration
    this.ckeditorInit(this.config || {});
  }

  /**
   * Value update process
   */
  updateValue(value: any) {
    this.zone.run(() => {
      this.value = value;

      this.onChange(value);

      this.onTouched();
      this.change.emit(value);
    });
  }

  /**
   * CKEditor init
   */
  ckeditorInit(config: any) {


    /*
    CAILLETEAU
    if (!CKEDITOR) {
      console.error('Please include CKEditor in your page');
      return;
    }
    */

    // From http://stackoverflow.com/questions/35978025/angular2-ckeditor-use
    if (!window['CKEDITOR']) {
      console.error('Please include CKEditor in your page');
      return;
    }


    // CKEditor replace textarea
    // CAILLETEAU
    // From ng2 module
    // this.instance = CKEDITOR.replace(this.host.nativeElement, config);

    // From http://stackoverflow.com/questions/35978025/angular2-ckeditor-use
    // this.instance = window['CKEDITOR']['replace']( 'editor1' );
    this.instance = window['CKEDITOR'].replace(this.host.nativeElement, config);



    // Set initial value
    this.instance.setData(this.value);

    // listen for instanceReady event
    this.instance.on('instanceReady', (evt: any) => {
      // send the evt to the EventEmitter
      this.ready.emit(evt);
    });

    // CKEditor change event
    this.instance.on('change', () => {
      this.onTouched();
      let value = this.instance.getData();

      // Debounce update
      if (this.debounce) {
        if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
          this.updateValue(value);
          this.debounceTimeout = null;
        }, parseInt(this.debounce));

      // Live update
      } else {
        this.updateValue(value);
      }
    });

    // CKEditor blur event
    this.instance.on('blur', (evt: any) => {
      this.blur.emit(evt);
    });

    // CKEditor focus event
    this.instance.on('focus', (evt: any) => {
      this.focus.emit(evt);
    });
  }

  /**
   * Implements ControlValueAccessor
   */
  writeValue(value: any) {
    this._value = value;
    if (this.instance)
      this.instance.setData(value);
  }
  onChange(_: any) {}
  onTouched() {}
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
}
