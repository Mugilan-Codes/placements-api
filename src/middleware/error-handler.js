// import {
//   ValidationError,
//   NotFoundError,
//   DBError,
//   ConstraintViolationError,
//   UniqueViolationError,
//   NotNullViolationError,
//   ForeignKeyViolationError,
//   CheckViolationError,
//   DataError,
// } from 'objection';

import { ApiError } from '../utils';

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).send({
      error: {
        status: err.status,
        message: err.message,
      },
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Invalid Token',
      },
    });
  }

  return res.status(500).send({
    error: {
      status: 500,
      message: err.message || 'Internal Server Error',
    },
  });
};

// TODO: Correct the code
// REF: https://github.com/CodingGarden/inventory-app/blob/master/backend/src/middlewares.js
// REF: https://vincit.github.io/objection.js/recipes/error-handling.html#examples
// const errorHandler = (err, res) => {
//   if (err instanceof ValidationError) {
//     switch (err.type) {
//       case 'ModelValidation':
//         res.status(400).send({
//           message: err.message,
//           type: err.type,
//           data: err.data,
//         });
//         break;
//       case 'RelationExpression':
//         res.status(400).send({
//           message: err.message,
//           type: 'RelationExpression',
//           data: {},
//         });
//         break;
//       case 'UnallowedRelation':
//         res.status(400).send({
//           message: err.message,
//           type: err.type,
//           data: {},
//         });
//         break;
//       case 'InvalidGraph':
//         res.status(400).send({
//           message: err.message,
//           type: err.type,
//           data: {},
//         });
//         break;
//       default:
//         res.status(400).send({
//           message: err.message,
//           type: 'UnknownValidationError',
//           data: {},
//         });
//         break;
//     }
//   } else if (err instanceof NotFoundError) {
//     res.status(404).send({
//       message: err.message,
//       type: 'NotFound',
//       data: {},
//     });
//   } else if (err instanceof UniqueViolationError) {
//     res.status(409).send({
//       message: err.message,
//       type: 'UniqueViolation',
//       data: {
//         columns: err.columns,
//         table: err.table,
//         constraint: err.constraint,
//       },
//     });
//   } else if (err instanceof NotNullViolationError) {
//     res.status(400).send({
//       message: err.message,
//       type: 'NotNullViolation',
//       data: {
//         column: err.column,
//         table: err.table,
//       },
//     });
//   } else if (err instanceof ForeignKeyViolationError) {
//     res.status(409).send({
//       message: err.message,
//       type: 'ForeignKeyViolation',
//       data: {
//         table: err.table,
//         constraint: err.constraint,
//       },
//     });
//   } else if (err instanceof CheckViolationError) {
//     res.status(400).send({
//       message: err.message,
//       type: 'CheckViolation',
//       data: {
//         table: err.table,
//         constraint: err.constraint,
//       },
//     });
//   } else if (err instanceof DataError) {
//     res.status(400).send({
//       message: err.message,
//       type: 'InvalidData',
//       data: {},
//     });
//   } else if (err instanceof DBError) {
//     res.status(500).send({
//       message: err.message,
//       type: 'UnknownDatabaseError',
//       data: {},
//     });
//   } else {
//     res.status(500).send({
//       message: err.message,
//       type: 'UnknownError',
//       data: {},
//     });
//   }
// };
