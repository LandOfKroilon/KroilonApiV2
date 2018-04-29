import { Container } from "inversify";
import { HomeController } from "../1presentation/controllers/HomeController";
import TYPES from "./types";
import { RegistrableController } from "../1presentation/controllers/RegistrableController";
import { MasterController } from "../1presentation/controllers/MasterController";
import { MasterRepository } from "../3domain/repositories/impl/MasterRepository";
import { IMasterRepository } from "../3domain/repositories/interfaces/IMasterRepository";
import { IMasterService } from "../2application/interfaces/IMasterService";
import { MasterService } from "../2application/impl/MasterService";
import { AcademyService } from "../2application/impl/AcademyService";
import { IAcademyService } from "../2application/interfaces/IAcademyService";
import { AcademyController } from "../1presentation/controllers/AcademyController";
import { AcademyRepository } from "../3domain/repositories/impl/AcademyRepository";
import { IAcademyRepository } from "../3domain/repositories/interfaces/IAcademyRepository";

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