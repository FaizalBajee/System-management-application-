import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { locationModel } from 'src/app/models/location.model';
import { masterType } from 'src/app/models/masterType.model';
import { materialTypeModel } from 'src/app/models/materialType.model';
import { unitModel } from 'src/app/models/unit.model';
import { LocationService } from 'src/app/services/location.service';
import { MasterTypeService } from 'src/app/services/masterType.service';
import { MaterialTypeService } from 'src/app/services/materialType.service';
import { UnitService } from 'src/app/services/unit.service';
import { DatePipe } from '@angular/common';
import { ComplaintMasterService } from 'src/app/services/complaintMaster.service';
import { ComplaintMasterModel } from 'src/app/models/complaintMaster.model';
import { ComplaintMasterUploadService } from 'src/app/services/complaintMasterUpoad.service';
import { LoginService } from 'src/app/services/login.service';
import { GetComplaintInfoService } from 'src/app/services/getComplaintInfo.service';
import { Router } from '@angular/router';
import { computerMasterModel } from 'src/app/models/computerMaster.model';
import { GetMonitorService } from 'src/app/services/getMonitor.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
  providers: [DatePipe]
})
export class MasterPage implements OnInit {
  masterForm!: FormGroup;
  formattedDate = '';
  monitor: computerMasterModel[] = [];
  getItemId?: number;
  complaintMaster: ComplaintMasterModel[] = [];
  getComplaintInfo: ComplaintMasterModel[] = [];
  masterType: masterType[] = [];
  unit: unitModel[] = [];//TATA AND TVS --
  location: locationModel[] = [];
  availableLocations: locationModel[] = [];
  materialType: materialTypeModel[] = [];
  availableMaterialType: materialTypeModel[] = [];
  showComputerDetails: boolean = false;
  constructor(private route: Router, private fb: FormBuilder, private getMonitorService: GetMonitorService, private MTservice: MasterTypeService, private getComplaintInfoService: GetComplaintInfoService, private datePipe: DatePipe, private unitservice: UnitService, private locatonService: LocationService, private materialTypeService: MaterialTypeService, private complaintMasterService: ComplaintMasterService, private uploadService: ComplaintMasterUploadService, private loginService: LoginService) {
    this.masterForm = this.fb.group({
      master_type: ['', Validators.required],
      unit: ['', Validators.required],
      location: ['', Validators.required],
      material_type: ['', Validators.required],
      id_no: ['', Validators.required],
      user: ['', [Validators.maxLength(50)]],
      monitor: ['', [Validators.maxLength(50)]],
      keyboard: ['', [Validators.maxLength(50)]],
      mouse: ['', [Validators.maxLength(50)]],
      ram: ['', [Validators.maxLength(50)]],
      processer: ['', [Validators.maxLength(50)]],
      mother_board: ['', [Validators.maxLength(50)]],
      cabinet: ['', [Validators.maxLength(50)]],
      hard_disk: ['', [Validators.maxLength(50)]],
      os: ['', [Validators.maxLength(50)]],
      os_key: ['', [Validators.maxLength(50)]],
      printer: ['', [Validators.maxLength(50)]],
      scanner: ['', [Validators.maxLength(50)]],
      ip_address: ['', [Validators.maxLength(50)]],
      mac_id: ['', [Validators.maxLength(50)]],
      system_name: ['', [Validators.maxLength(50)]],
      department: ['', [Validators.maxLength(50)]],
      serial_no: ['', [Validators.maxLength(50)]],
      remark: ['', [Validators.maxLength(50)]],
      ms_office_key: ['', [Validators.maxLength(50)]],
      date: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.getMonitor();
    this.getItemIdFun();
    this.getMasterType();
    this.getUnit();
    this.getLocation();
    this.getMaterialType();
    this.showComputer();
  }
  showComputer() {
    this.masterForm.get('material_type')?.valueChanges.subscribe(value => {
      this.showComputerDetails = value === 'COMPUTER';
      this.setValidatorsForComputerDetails();
    });
  }
  setValidatorsForComputerDetails() {
    const fields = [
      'user', 'monitor', 'keyboard', 'mouse', 'ram', 'processer',
      'mother_board', 'cabinet', 'hard_disk', 'os', 'os_key',
      'printer', 'scanner', 'ip_address', 'mac_id', 'system_name',
      'department', 'serial_no', 'remark', 'ms_office_key'
    ];

    fields.forEach(field => {
      const control = this.masterForm.get(field);
      if (this.showComputerDetails) {
        control?.setValidators([Validators.required, Validators.maxLength(50)]);
      } else {
        control?.clearValidators();
        control?.setValidators([Validators.maxLength(50)]);
      }
      control?.updateValueAndValidity();
    });
  }
  getItemIdFun() {
    this.complaintMasterService.complaintMasterService().subscribe(Response => {
      this.complaintMaster = Response.content.showComplaintMaster
      if (this.complaintMaster && this.complaintMaster.length > 0) {
        let lastComplaint = this.complaintMaster[this.complaintMaster.length - 1];
        this.getItemId = lastComplaint.id;
      } else {
        this.getItemId = 0;
      }
    })
  }
  getMonitor() {
    this.getMonitorService.getMonitorService().subscribe(Response => {
      this.monitor = Response.content.showComputerMaster
    })
  }
  getMasterType() {
    this.MTservice.MasterTypeService().subscribe(Response => {
      this.masterType = Response.content.showMaster;
    })
  }
  getUnit() {
    this.unitservice.unitService().subscribe(Response => {
      this.unit = Response.content.showUnit;
    })
  }
  getLocation() {
    this.locatonService.locationService().subscribe(Response => {
      this.location = Response.content.showLocation;
    })
  }
  getMaterialType() {
    this.materialTypeService.materialType().subscribe(Response => {
      this.materialType = Response.content.showMaterial;
    })
  }

  datePick(event: any) {
    const selectedDate = event.detail.value
    this.formattedDate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') || '';
    this.masterForm.patchValue({ date: event.detail.value });
  }

  onUnitChange(event: any) {
    const selectedUnitId = event.detail.value.id;
    const selectedUnitData = this.location.filter(loc => loc.unitId === selectedUnitId);
    this.availableLocations = selectedUnitData || [];
    this.masterForm.get('location')?.setValue('');
  }
  onMasterChange(event: any) {
    const selectedMasterId = event.detail.value.id;
    const selectedMasterData = this.materialType.filter(master => master.masterId === selectedMasterId);
    this.availableMaterialType = selectedMasterData || [];
    this.masterForm.get('material_type')?.setValue('');

  }
  onMaterialChange(event: any) {
    const masterCode = this.masterForm.value.master_type.master_code;
    console.log("masterCode: ", masterCode);
    let LastId = (this.getItemId || 0) + 1;
    const newId = `${masterCode}${LastId.toString().padStart(4, '0')}`;
    this.masterForm.get('id_no')?.setValue(newId);
  }
  addMaster() {
    if (this.masterForm.valid) {
      const selectedMaster = this.masterForm.get('master_type')?.value;
      const selectedUnit = this.masterForm.get('unit')?.value;
      this.masterForm.get('master_type')?.setValue(selectedMaster.master_type);
      this.masterForm.get('unit')?.setValue(selectedUnit.unit)
      // const masterCode = this.masterForm.value.master_type.masterCode;
      // const masterTypeCode = masterCode;
      // ++this.getItemId;
      // const newId = `${masterTypeCode}${this.getItemId.toString().padStart(4, '0')}`;
      // this.masterForm.get('id_no')?.setValue(newId);
      this.uploadMaster();
      console.log(this.masterForm.value);
    }
  }
  uploadMaster() {
    const payload: ComplaintMasterModel = {
      master_type: this.masterForm.get('master_type')?.value,
      unit: this.masterForm.get('unit')?.value,
      location: this.masterForm.get('location')?.value,
      material_type: this.masterForm.get('material_type')?.value,
      IDNO: this.masterForm.get('id_no')?.value,
      user_name: this.masterForm.get('user')?.value,
      monitor: this.masterForm.get('monitor')?.value,
      keyboad: this.masterForm.get('keyboard')?.value,
      mouse: this.masterForm.get('mouse')?.value,
      ram: this.masterForm.get('ram')?.value,
      processer: this.masterForm.get('processer')?.value,
      mother_board: this.masterForm.get('mother_board')?.value,
      cabinet: this.masterForm.get('cabinet')?.value,
      hard_disk: this.masterForm.get('hard_disk')?.value,
      os: this.masterForm.get('os')?.value,
      os_key: this.masterForm.get('os_key')?.value,
      printer: this.masterForm.get('printer')?.value,
      scanner: this.masterForm.get('scanner')?.value,
      ip_address: this.masterForm.get('ip_address')?.value,
      mac_id: this.masterForm.get('mac_id')?.value,
      system_name: this.masterForm.get('system_name')?.value,
      department: this.masterForm.get('department')?.value,
      serial_no: this.masterForm.get('serial_no')?.value,
      remark: this.masterForm.get('remark')?.value,
      ms_office_key: this.masterForm.get('ms_office_key')?.value,
      install_date: this.masterForm.get('date')?.value,
    };
    this.uploadService.complaintMasterUploadService(payload).subscribe(Response => {
      if (!Response.success) {
        alert(Response.message);
        return;
      }
      alert('updated successfully!');
      window.location.reload();
    })
  }
  logout() {
    // this.loginService.logout()
  }
  goToReport() {
    this.route.navigate(['report'])
  }

}
