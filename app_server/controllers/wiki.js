/* GET 'home' page */
module.exports.categoryList = function(req, res) {

  var template = 'templates' + '/christyle/three-blocs';

  var data = {
    title: 'Bigre premier essai',
    top: [{

    }],
    left: [{
      type: 'menu/vertical-accordion',
      name: 'leftMainMenu',
      items: [{
        id: 'sixieme',
        label: 'Sixième 6666',
        anchor: 'http://www.google.fr',
        collapsed: true,
        items: [{
          id: 'ortho',
          label: 'Orthographe OOOO',
          anchor: 'http://www.google.fr'
        }, {
          id: 'ortho_2',
          label: 'Orthographe  2 OOOO',
          anchor: 'http://www.google.fr'
        }, {
          id: 'ortho_3',
          label: 'Orthographe 3 OOOO',
          anchor: 'http://www.google.fr',
          collapsed: true,
          items: [{
            id: 'ortho_21',
            label: 'Inside 21',
            anchor: 'http://www.google.fr',
            items: [{
              id: 'ortho_211',
              label: 'Inside 211',
              anchor: 'http://www.google.fr'
            }, {
              id: 'ortho_212',
              label: 'Inside 212',
              anchor: 'http://msg.mma.fr'
            }, {
              id: 'ortho_213',
              label: 'Inside 213',
              anchor: 'http://www.google.fr'
            }, {
              id: 'ortho_214',
              label: 'Inside 214',
              anchor: 'http://www.google.fr'
            }]
          }, {
            id: 'ortho_22',
            label: 'Insidee 22',
            anchor: 'http://www.google.fr'
          }]
        }]
      }, {
        id: 'cinquieme',
        label: 'Cinquième',
        anchor: '#'
      }]
    }, {
      type: 'menu/vertical-accordion',
      name: 'leftSecondMenu',
      items: [{
        id: 'torto',
        label: 'J Sixième 6666',
        anchor: 'http://www.google.fr'
      }, {
        id: 'torto2',
        label: 'J Orthographe OOOO',
        anchor: 'http://www.google.fr',
        parent: 'torto'
      }, {
        id: '5_2',
        label: 'J Cinquieme 5555',
        anchor: 'http://www.mma.fr'
      }]
    }],
    main: [{
      type: 'wiki/articles-list',
      articles: [{
        title: 'Mon premier article généré !!!',
        summary: 'Voici le résumé de ce premier article, a bien tester donc. <b>Tien du gras</b>'
      }, {
        title: 'Mon second article generé !!!',
        summary: 'Voici le résumé de ce second article, a bien tester donc. <b>Tien du gras</b>'
      }, {
        title: 'Mon 3ème article generé !!!',
        summary: 'Voici le résumé de ce troisième article, a bien tester donc. <b>Tien du gras</b>'
      }]
    }]
  }

  res.render(template, data);

  /*
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
        }, {
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        }, {
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
        }]
    });
    */
};

/* GET 'Location info' page */
/*
module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};
*/

/* GET 'Add review' page */
/*
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: {
            title: 'Review Starcups'
        }
    });
};
*/
