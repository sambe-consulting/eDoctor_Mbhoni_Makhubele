from datetime import datetime, time
from datetime import timedelta  
from database.database import Database

class Booking:
    def __init__(self, subject, description, date, duration, patient_id, specialist_id):
        self.subject = str(subject)
        self.description = str(description)
        self.date = str(date)
        self.duration = str(duration)
        self.specialist_id = str(specialist_id)
        self.patient_id = str(patient_id)
        self.dateCreated = str(datetime.today().date())
        self.status = "0" 

        # 0 = await approval
        # 1 = approved
        # 2 = declined

    def appointmentDatetime(self):
        pass
        data = Database()
        query = "SELECT B_Hours_Open, B_Hours_Close FROM Health_Sector WHERE id='" + self.specialist_id + "'"

        rows = data.getHealthSector(query)
        b_h_open = str(rows[0]) + ":00"
        b_h_close = str(rows[1]) + ":00"

        query = "SELECT AppDate FROM Appointment WHERE SectorID='" + self.specialist_id + "'"
        apointments = data.getAppoitnments(query)
        temp: str
   

        if(len(apointments) == 0):
            appTime = str(self.dateCreated) + " " + str(b_h_open)
            _appTime = datetime.strptime(appTime, '%Y-%m-%d %H:%M:%S') + timedelta(days=1)
            self.date = str(_appTime)
            return self.date
        else:
            index = len(apointments) - 1
            latestAppointment = (apointments[index][0])
            _appTime = datetime.strptime(str(latestAppointment), "%Y-%m-%d %H:%M:%S")
            b_close_Time = datetime.strptime(b_h_close, '%H:%M:%S').time()
            closing_Hour = b_close_Time.hour
            
            _newApp_Time = _appTime.hour + 2 #now compare if it's off hours


            if _newApp_Time > closing_Hour:
                actualDate = str(_appTime.date()) + " " + str(b_h_open)
                date_to_db = datetime.strptime(str(actualDate), "%Y-%m-%d %H:%M:%S")
                nextDay = date_to_db + timedelta(days=1)
                return str(nextDay)
            else:
                actualDate = str(_appTime.date()) + " " + str(_newApp_Time) + ":00:00"
                date_to_db = datetime.strptime(str(actualDate), "%Y-%m-%d %H:%M:%S")
                return str(date_to_db)



    def setStatus(self, status):
        self.status = status
    
    def getStatus(self):
        return self.status

    def getName(self):
        return self.name

    def getDescription(self):
        return self.description
    
    def getDate(self):
        return self.duration
    
    def getPatientID(self):
        return self.patient_id

    def getSpecialistID(self):
        return self.specialist_id

    def getDateCreated(self):
        return self.dateCreated
    