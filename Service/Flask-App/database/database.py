import sqlite3

class Database():
    def __init__(self):
        # self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        # self.cursor = self.connection.cursor()
        pass



    

#region User Management
    def getUsers(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        self.connection.commit()
        self.connection.close()
        return rows


    def getUser(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        self.connection.commit()
        self.connection.close()
        return row

    def updateUser(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()
    

    def RegisterUser(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()
#endregion


#region Specialists Management

    def RegisterSpecialist(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    def updateSpecialist(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

#endregion


#region Patients


    def RegisterPatient(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    def updatePatient(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

#endregion

    
#region Admin

    def RegisterAdmin(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    def updateAdmin(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()


#endregion


#region Health Sector Management

    def AddHealthSector(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    def UpdateHealthSector(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    
    def getHealthSector(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        self.connection.commit()
        self.connection.close()
        return row
    
    def getHealthSectors(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        self.connection.commit()
        self.connection.close()
        return row


#endregion
    


#region Appointment Management
    def addAppointment(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()

    def getAppoitment(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        self.connection.commit()
        self.connection.close()
        return row
    
    def getAppoitnments(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        self.connection.commit()
        self.connection.close()
        return row    

#endregion                


