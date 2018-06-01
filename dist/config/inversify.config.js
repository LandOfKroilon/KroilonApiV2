"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const AcademyController_1 = require("../1presentation/controllers/AcademyController");
const HomeController_1 = require("../1presentation/controllers/HomeController");
const MasterController_1 = require("../1presentation/controllers/MasterController");
const AcademyService_1 = require("../2application/impl/AcademyService");
const MasterService_1 = require("../2application/impl/MasterService");
const AcademyRepository_1 = require("../3domain/repositories/impl/AcademyRepository");
const MasterRepository_1 = require("../3domain/repositories/impl/MasterRepository");
const types_1 = require("./types");
const container = new inversify_1.Container();
// controllers
container.bind(types_1.default.Controller).to(HomeController_1.HomeController);
container.bind(types_1.default.Controller).to(MasterController_1.MasterController);
container.bind(types_1.default.Controller).to(AcademyController_1.AcademyController);
// services
container.bind(types_1.default.MasterService).to(MasterService_1.MasterService);
container.bind(types_1.default.AcademyService).to(AcademyService_1.AcademyService);
// Repos
container.bind(types_1.default.MasterRepository).to(MasterRepository_1.MasterRepository);
container.bind(types_1.default.AcademyRepository).to(AcademyRepository_1.AcademyRepository);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map