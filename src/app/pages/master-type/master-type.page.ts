import { Component, OnInit } from '@angular/core';
import { computerMasterModel } from 'src/app/models/computerMaster.model';
import { computerTypeModel } from 'src/app/models/computerType.model';
import { masterType } from 'src/app/models/masterType.model';
import { materialTypeModel } from 'src/app/models/materialType.model';
import { GetComputerMasterService } from 'src/app/services/getComputerMaster.service';
import { GetComputerTypeService } from 'src/app/services/getComputerType.service';
import { MasterTypeService } from 'src/app/services/masterType.service';
import { MaterialTypeService } from 'src/app/services/materialType.service';
import { UpdateComputerMasterService } from 'src/app/services/updateComputerMaster.service';
import { UpdateComputerTypeService } from 'src/app/services/updateComputerType.service';
import { UpdateMasterTypeService } from 'src/app/services/updateMasterType.service';
import { UpdateMaterialService } from 'src/app/services/updateMaterial.service';
@Component({
  selector: 'app-master-type',
  templateUrl: './master-type.page.html',
  styleUrls: ['./master-type.page.scss'],
})
export class MasterTypePage implements OnInit {
  masterType: masterType[] = [];
  materialType: materialTypeModel[] = [];
  availableMaterialType: materialTypeModel[] = [];
  computerMasterInfo: computerMasterModel[] = [];
  computerTypeInfo: computerTypeModel[] = [];
  masterId !: number;
  materialId!: number;
  computerMasterId!: number;
  materialName!: string;
  MaterialDivisionName!: string;
  computerTypeName!: string;
  masterTypeName!: string;
  masterTypeCode!: string;
  isMasterTypeFormVisible = false;
  isMaterialTypeFormVisible = false;
  isMaterialDivisionFormVisible = false;
  isComputerMasterMaterialFormVisible = false;
  constructor(private masterTypeService: MasterTypeService, private getComputerTypeService: GetComputerTypeService, private updateMasterTypeService: UpdateMasterTypeService, private updateComputerTypeService: UpdateComputerTypeService, private getComputerMasterService: GetComputerMasterService, private updateComputerMasterService: UpdateComputerMasterService, private materialTypeService: MaterialTypeService, private updateMaterialService: UpdateMaterialService) { }
  toggleMasterTypeForm() {
    this.isMasterTypeFormVisible = !this.isMasterTypeFormVisible;
  }
  toggleMaterialTypeForm() {
    this.isMaterialTypeFormVisible = !this.isMaterialTypeFormVisible
  }
  toggleMaterialDivisionForm() {
    this.isMaterialDivisionFormVisible = !this.isMaterialDivisionFormVisible
  }
  toggleComputerMasterMaterialForm() {
    this.isComputerMasterMaterialFormVisible = !this.isComputerMasterMaterialFormVisible
  }
  ngOnInit() {
    this.getMasterType();
    this.getMaterialType();
    this.getComputerMaster();
    this.getComputerType();
  }
  getMasterType() {
    this.masterTypeService.MasterTypeService().subscribe(Response => {
      this.masterType = Response.content.showMaster;
    })
  }
  getMaterialType() {
    this.materialTypeService.materialType().subscribe(Response => {
      this.materialType = Response.content.showMaterial;
    })
  }
  getComputerMaster() {
    this.getComputerMasterService.getComputerMasterService().subscribe(Response => {
      if (Response.success) {
        this.computerMasterInfo = Response.content.showComputerMaster
      }
    })
  }
  getComputerType() {
    this.getComputerTypeService.getComputerTypeService().subscribe(Response => {
      if (Response.success) {
        this.computerTypeInfo = Response.content.showComputerType
      }
    })
  }
  onMasterChangeA(event: any) {
    this.masterId = event.detail.value.id
  }
  onMasterChangeB(event: any) {
    const selectedMasterId = event.detail.value.id;
    this.masterId = event.detail.value.id;
    const selectedMasterData = this.materialType.filter(master => master.masterId === selectedMasterId);
    this.availableMaterialType = selectedMasterData || [];
  }
  onMaterialChangeB(event: any) {
    this.materialId = event.detail.value.id;
  }
  onComputerMasterChangeC(event: any) {
    this.computerMasterId = event.detail.value.id;
  }
  handleMaterialAdd() {
    const payload: materialTypeModel = {
      material_type: this.materialName,
      masterId: this.masterId
    }
    this.updateMaterialService.updateMaterialService(payload).subscribe(Response => {
      if (!Response.success) {
        alert('something went wrong');
      }
      alert(Response.message);
      this.materialName = ''
      window.location.reload();
    })

  }
  handleMaterialDivisionAdd(event: any) {
    const payload: computerMasterModel = {
      item_type: this.MaterialDivisionName,
      material_id: this.materialId
    }
    this.updateComputerMasterService.updateComputerMasterService(payload).subscribe(Response => {
      if (!Response.success) {
        alert('something went wrong');
      }
      alert(Response.message);
      this.MaterialDivisionName = ''
      window.location.reload();
    })

  }
  handleComputerTypeAdd() {
    const payload: computerTypeModel = {
      item_name: this.computerTypeName,
      computer_master_id: this.computerMasterId
    }
    this.updateComputerTypeService.updateComputerTypeService(payload).subscribe(Response => {
      if (Response.success) {
        alert(Response.message)
        window.location.reload();
      }
    })

  }
  handleMasterTypeAdd() {
    const payload: masterType = {
      master_type: this.masterTypeName,
      master_code: this.masterTypeCode,
    }
    this.updateMasterTypeService.updateMasterTypeService(payload).subscribe(Response => {
      if (!Response.success) {
        alert('something went wrong');
      }
      alert(Response.message);
      this.materialName = ''
      window.location.reload();
    })
  }
  //
  submitForm() {
    alert(this.masterTypeName + " " + this.masterTypeCode)
    this.toggleMasterTypeForm()
  }

}
