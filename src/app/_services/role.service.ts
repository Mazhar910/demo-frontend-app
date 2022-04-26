import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role } from '../_models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  endpoint = environment.APIEndpoint;
  
  constructor(private http: HttpClient) { }

  getRoles(roleName: any, userId) {
    return this.http.get<any>(this.endpoint + "/roles/" + roleName + "/" + userId);
}
  getRoleById(id:any) {
    return this.http.get<any>(this.endpoint+"/role/"+id);
  }
  getRoleByUuid(uuid: any) {
    return this.http.get<any>(this.endpoint + "/role/uuid/" + uuid);
  }
  getRoleByName(name:any) {
    return this.http.get<any>(this.endpoint+"/role-by-name/"+name);
  }
  createRole(role: any) {
    return this.http.post(this.endpoint+"/role", role);
  }
  updateRole(role:any) {
    return this.http.put<any>(this.endpoint+"/role/"+role.id,role);
  }
  deleteRole(role:any) {
    return this.http.delete<any>(this.endpoint+"/role/"+role.id);
  }
  updateState(role: any) {
    return this.http.put<any>(this.endpoint + "/role/state/" +role.id, role);
  }
}
