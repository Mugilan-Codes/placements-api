import { Model } from 'objection';

// REF: require-loops - https://vincit.github.io/objection.js/guide/relations.html#require-loops
// REF: modelPaths - https://vincit.github.io/objection.js/api/model/static-properties.html#static-modelpaths
// HACK: To get rid of require-loops error, defined a BaseModel Class and used that to extend other classes

// REF: Dynamic Imports in ES6 - https://javascript.info/modules-dynamic-imports
// REVIEW: modelClass: (async () => await import('./Video'))()

// REF: Automatic GUIDs - https://github.com/seegno/objection-guid
// REF: https://github.com/Vincit/objection.js/issues/1706#issue-577010173
// TODO: add guid/uuid support as a plugin

// REF: Mixins in Models - https://vincit.github.io/objection.js/guide/plugins.html#plugin-development-best-practices

// REF: password hashing - https://github.com/scoutforpets/objection-password

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export default BaseModel;
