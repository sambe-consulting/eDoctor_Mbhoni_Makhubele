export class Slot {
  id = '';
  date = '';
  time = '';
  SecotorID = '';
  status = 0;
  name = '';

  constructor(id: any, date: any, time: any, SectorID: any, status: number) {
    this.id = id;
    this.date = date;
    this.time = time;
    this.SecotorID = this.SecotorID;
    this.status = status;
  }
}
