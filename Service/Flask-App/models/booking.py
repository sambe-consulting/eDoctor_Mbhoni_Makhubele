from datetime import datetime

class Booking:
    def __init__(self, subject, description, date, duration, patient_id, specialist_id):
        self.subject = subject
        self.description = description
        self.date = date
        self.duration = duration
        self.specialist_id = specialist_id
        self.patient_id = patient_id
        self.dateCreated = str(datetime.today())
        self.status = "0" 

        # 0 = await approval
        # 1 = approved
        # 2 = declined

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
    