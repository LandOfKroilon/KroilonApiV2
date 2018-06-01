"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MasterDTO {
    constructor(id, name, email, avatar, academyId = undefined, createdOn = undefined) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.academyId = academyId;
        this.createdOn = createdOn;
    }
}
exports.MasterDTO = MasterDTO;
//# sourceMappingURL=MasterDTO.js.map