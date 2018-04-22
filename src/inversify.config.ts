import { Container } from "inversify";
import { HomeController } from "./1presentation/controllers/HomeController";
import TYPES from "./types";
import { RegistrableController } from "./1presentation/controllers/RegistrableController";
import { MasterController } from "./1presentation/controllers/MasterController";
import { MasterRepository } from "./3domain/repositories/impl/MasterRepository";
import { IMasterRepository } from "./3domain/repositories/IMasterRepository";
import { IMasterService } from "./2application/interfaces/IMasterService";
import { MasterService } from "./2application/impl/MasterService";

const container = new Container();

// controllers
container.bind<RegistrableController>(TYPES.Controller).to(HomeController);
container.bind<RegistrableController>(TYPES.Controller).to(MasterController);

// services
container.bind<IMasterService>(TYPES.MasterService).to(MasterService);

// Repos
container.bind<IMasterRepository>(TYPES.MasterRepository).to(MasterRepository);

export default container;