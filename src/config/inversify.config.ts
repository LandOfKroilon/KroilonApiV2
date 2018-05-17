import { Container } from "inversify";
import { AcademyController } from "../1presentation/controllers/AcademyController";
import { HomeController } from "../1presentation/controllers/HomeController";
import { MasterController } from "../1presentation/controllers/MasterController";
import { RegistrableController } from "../1presentation/controllers/RegistrableController";
import { AcademyService } from "../2application/impl/AcademyService";
import { MasterService } from "../2application/impl/MasterService";
import { IAcademyService } from "../2application/interfaces/IAcademyService";
import { IMasterService } from "../2application/interfaces/IMasterService";
import { AcademyRepository } from "../3domain/repositories/impl/AcademyRepository";
import { MasterRepository } from "../3domain/repositories/impl/MasterRepository";
import { IAcademyRepository } from "../3domain/repositories/interfaces/IAcademyRepository";
import { IMasterRepository } from "../3domain/repositories/interfaces/IMasterRepository";
import TYPES from "./types";

const container = new Container();

// controllers
container.bind<RegistrableController>(TYPES.Controller).to(HomeController);
container.bind<RegistrableController>(TYPES.Controller).to(MasterController);
container.bind<RegistrableController>(TYPES.Controller).to(AcademyController);

// services
container.bind<IMasterService>(TYPES.MasterService).to(MasterService);
container.bind<IAcademyService>(TYPES.AcademyService).to(AcademyService);

// Repos
container.bind<IMasterRepository>(TYPES.MasterRepository).to(MasterRepository);
container.bind<IAcademyRepository>(TYPES.AcademyRepository).to(AcademyRepository);

export default container;