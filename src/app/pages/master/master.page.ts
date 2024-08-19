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

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
  providers: [DatePipe]
})
export class MasterPage implements OnInit {
  masterForm!: FormGroup;
  formattedDate = '';
  getItemId?: number;
  complaintMaster: ComplaintMasterModel[] = [];
  masterType: masterType[] = [];
  unit: unitModel[] = [];//TATA AND TVS --
  location: locationModel[] = [];
  availableLocations: locationModel[] = [];
  materialType: materialTypeModel[] = [];
  availableMaterialType: materialTypeModel[] = [];
  constructor(private fb: FormBuilder, private MTservice: MasterTypeService, private datePipe: DatePipe, private unitservice: UnitService, private locatonService: LocationService, private materialTypeService: MaterialTypeService, private complaintMasterService: ComplaintMasterService, private uploadService: ComplaintMasterUploadService) {
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
      remarks: ['', [Validators.maxLength(50)]],
      ms_office_key: ['', [Validators.maxLength(50)]],
      date: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.getComplaintMaster()
    this.getMasterType()
    this.getUnit()
    this.getLocation()
    this.getMaterialType()
  }
  getComplaintMaster() {
    this.complaintMasterService.complaintMasterService().subscribe(Response => {
      this.complaintMaster = Response.content.showComplaintMaster
      if (this.complaintMaster && this.complaintMaster.length > 0) {
        const lastComplaint = this.complaintMaster[this.complaintMaster.length - 1];
        this.getItemId = lastComplaint.id;
      } else {
        this.getItemId = 0;
      }
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
    const selectedUnit = event.detail.value;
    const unit = selectedUnit.unit;
    const selectedUnitId = selectedUnit.id;
    const selectedUnitData = this.location.filter(loc => loc.unitId === selectedUnitId);
    this.availableLocations = selectedUnitData || [];
    this.masterForm.get('location')?.setValue('');

  }
  onMasterChange(event: any) {
    const selectedMaster = event.detail.value;
    const selectedMasterId = selectedMaster.id;
    const selectedMasterData = this.materialType.filter(master => master.masterId === selectedMasterId);
    this.availableMaterialType = selectedMasterData || [];
    this.masterForm.get('material_type')?.setValue('');

  }
  onMaterialChange(event: any) {
    const masterCode = this.masterForm.value.master_type.masterCode;
    console.log("masterCode: ", masterCode)
    const masterTypeCode = masterCode;
    if (this.getItemId === undefined) {
      this.getItemId = 0;
    }
    ++this.getItemId;
    const newId = `${masterTypeCode}${this.getItemId.toString().padStart(4, '0')}`;
    this.masterForm.get('id_no')?.setValue(newId);
    console.log(typeof (this.masterForm.get('id_no')?.value))
  }
  addMaster() {
    if (this.masterForm.valid) {
      const master = this.masterForm.value.master_type.master;
      // const masterCode = this.masterForm.value.master_type.masterCode;
      const unit = this.masterForm.value.unit.unit;
      this.masterForm.get('master_type')?.setValue(master);
      this.masterForm.get('unit')?.setValue(unit);
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
      user_name: this.masterForm.get('user_name')?.value,
      monitor: this.masterForm.get('monitor')?.value,
      keyboard: this.masterForm.get('keyboard')?.value,
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
      window.location.reload();
      alert('updated successfully!')

    })
  }
  logout() {
    localStorage.removeItem('token')
    alert("logout")
  }

}
