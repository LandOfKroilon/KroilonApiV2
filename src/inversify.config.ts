import { Container } from "inversify";
import { HomeController } from "./1presentation/controllers/HomeController";
import TYPES from "./types";
import { RegistrableController } from "./1presentation/controllers/RegistrableController";

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(HomeController);

export default container;