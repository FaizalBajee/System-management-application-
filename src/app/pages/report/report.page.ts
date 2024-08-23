import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintMasterModel } from 'src/app/models/complaintMaster.model';
import { locationModel } from 'src/app/models/location.model';
import { masterType } from 'src/app/models/masterType.model';
import { materialTypeModel } from 'src/app/models/materialType.model';
import { unitModel } from 'src/app/models/unit.model';
import { GetComplaintInfoService } from 'src/app/services/getComplaintInfo.service';
import { LocationService } from 'src/app/services/location.service';
import { MasterTypeService } from 'src/app/services/masterType.service';
import { MaterialTypeService } from 'src/app/services/materialType.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  reportForm!: FormGroup;
  masterType: masterType[] = [];
  unit: unitModel[] = [];
  location: locationModel[] = [];
  materialType: materialTypeModel[] = [];
  availableMaterialType: materialTypeModel[] = [];
  availableLocations: locationModel[] = [];
  complaintInfo: ComplaintMasterModel[] = [];
  constructor(private fb: FormBuilder, private getinfo: GetComplaintInfoService, private MTservice: MasterTypeService, private materialTypeService: MaterialTypeService, private unitService: UnitService, private locationService: LocationService) {
    this.reportForm = this.fb.group({
      master_type: ['', Validators.required],
      unit: ['', Validators.required],
      location: ['', Validators.required],
      material_type: [''],
    })
  }
  ngOnInit() {
    this.getMasterType();
    this.getUnit();
    this.getLocation();
    this.getMaterialType();
  }
  getMasterType() {
    this.MTservice.MasterTypeService().subscribe(Response => {
      this.masterType = Response.content.showMaster;
    })
  }
  getUnit() {
    this.unitService.unitService().subscribe(Response => {
      this.unit = Response.content.showUnit;
    })
  }
  getLocation() {
    this.locationService.locationService().subscribe(Response => {
      this.location = Response.content.showLocation;
    })
  }
  getMaterialType() {
    this.materialTypeService.materialType().subscribe(Response => {
      this.materialType = Response.content.showMaterial;
    })
  }

  onUnitChange(event: any) {
    const selectedUnitId = event.detail.value.id;
    const selectedUnitData = this.location.filter(loc => loc.unitId === selectedUnitId);
    this.availableLocations = selectedUnitData || [];
    this.reportForm.get('location')?.setValue('');
  }

  onMasterChange(event: any) {
    const selectedMasterId = event.detail.value.id;
    const selectedMasterData = this.materialType.filter(master => master.masterId === selectedMasterId);
    this.availableMaterialType = selectedMasterData || [];
    this.reportForm.get('material_type')?.setValue('');
  }
  onMaterialChange(event: any) {

  }
  showReport() {
    if (this.reportForm.valid) {
      const master = this.reportForm.get('master_type')?.value.master_type
      const unit = this.reportForm.get('unit')?.value.unit
      const location = this.reportForm.get('location')?.value
      this.getinfo.getComplaintInfo(master, unit, location).subscribe(Response => {
        try {
          this.complaintInfo = Response.content.showComplaintMaster
          console.log(this.complaintInfo)
        } catch (error) {
          console.log(error)
        }
      })
    }
  }

}
