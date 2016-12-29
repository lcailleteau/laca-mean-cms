"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
/**
 * CKEditor component.
 * Usage :
 *  <lacackeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
var LacaCKEditorComponent = LacaCKEditorComponent_1 = (function () {
    /**
     * Constructor
     */
    function LacaCKEditorComponent(zone) {
        this.change = new core_1.EventEmitter();
        this.ready = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this._value = '';
        this.zone = zone;
    }
    Object.defineProperty(LacaCKEditorComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * On component destroy
     */
    LacaCKEditorComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        if (this.instance) {
            setTimeout(function () {
                _this.instance.removeAllListeners();
                _this.instance.destroy();
                _this.instance = null;
            });
        }
    };
    /**
     * On component view init
     */
    LacaCKEditorComponent.prototype.ngAfterViewInit = function () {
        // Configuration
        this.ckeditorInit(this.config || {});
    };
    /**
     * Value update process
     */
    LacaCKEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this.value = value;
            _this.onChange(value);
            _this.onTouched();
            _this.change.emit(value);
        });
    };
    /**
     * CKEditor init
     */
    LacaCKEditorComponent.prototype.ckeditorInit = function (config) {
        /*
        CAILLETEAU
        if (!CKEDITOR) {
          console.error('Please include CKEditor in your page');
          return;
        }
        */
        var _this = this;
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
        this.instance.on('instanceReady', function (evt) {
            // send the evt to the EventEmitter
            _this.ready.emit(evt);
        });
        // CKEditor change event
        this.instance.on('change', function () {
            _this.onTouched();
            var value = _this.instance.getData();
            // Debounce update
            if (_this.debounce) {
                if (_this.debounceTimeout)
                    clearTimeout(_this.debounceTimeout);
                _this.debounceTimeout = setTimeout(function () {
                    _this.updateValue(value);
                    _this.debounceTimeout = null;
                }, parseInt(_this.debounce));
            }
            else {
                _this.updateValue(value);
            }
        });
        // CKEditor blur event
        this.instance.on('blur', function (evt) {
            _this.blur.emit(evt);
        });
        // CKEditor focus event
        this.instance.on('focus', function (evt) {
            _this.focus.emit(evt);
        });
    };
    /**
     * Implements ControlValueAccessor
     */
    LacaCKEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
        if (this.instance)
            this.instance.setData(value);
    };
    LacaCKEditorComponent.prototype.onChange = function (_) { };
    LacaCKEditorComponent.prototype.onTouched = function () { };
    LacaCKEditorComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    LacaCKEditorComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    return LacaCKEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "debounce", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "ready", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "focus", void 0);
__decorate([
    core_1.ViewChild('host'),
    __metadata("design:type", Object)
], LacaCKEditorComponent.prototype, "host", void 0);
LacaCKEditorComponent = LacaCKEditorComponent_1 = __decorate([
    core_1.Component({
        selector: 'lacackeditor',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return LacaCKEditorComponent_1; }),
                multi: true
            }
        ],
        template: "<textarea #host></textarea>",
    }),
    __metadata("design:paramtypes", [core_1.NgZone])
], LacaCKEditorComponent);
exports.LacaCKEditorComponent = LacaCKEditorComponent;
var LacaCKEditorComponent_1;
//# sourceMappingURL=laca-ckeditor.component.js.map