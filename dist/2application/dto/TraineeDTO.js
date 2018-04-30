"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TraineeDTO {
    constructor(id, name, email, avatar, hash, profile, businessUnit, createdOn = undefined) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.hash = hash;
        this.profile = profile;
        this.businessUnit = businessUnit;
        this.createdOn = createdOn;
    }
}
exports.TraineeDTO = TraineeDTO;
//# sourceMappingURL=TraineeDTO.js.map