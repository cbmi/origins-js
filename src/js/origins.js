/* global define */

define([
    'underscore',
    './origins/core',
    './origins/models',
], function(_, origins, models) {

    origins.models = models;
    origins.store = models.store;

    this.origins = origins;

    origins.trigger('init', origins);

    return origins;

});
