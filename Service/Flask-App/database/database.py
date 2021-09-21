import sqlite3

class Database():
    def __init__(self):
        # self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        # self.cursor = self.connection.cursor()
        pass


        # self.name = name
        # self.surname = surname
        # self.ID_Number = ID_Number
        # self.email = email
        # self.password = password
        # self.contact = contact
        # self.type = type
        # self.resetcode = ''
        # self.signup_date = datetime.datetime.now()

    
   ############# User Management ################

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


    def RegisterSpecialist(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()
        # insert_user = "INSERT INTO User VALUES(" 
        # + specialist.name + "," 
        # + specialist.surname + "," 
        # + specialist.ID_Number + "," 
        # + specialist.email + "," 
        # + specialist.password + ","
        # + specialist.contact + ","
        # + specialist.type + ","
        # + specialist.resetcode + ","
        # + specialist.signup_date + ")"
        # self.cursor

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

    def getPatient(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        self.connection.commit()
        self.connection.close()
        return row


    def updateSpecialist(self, query: str):
        self.connection = sqlite3.connect('././Service/Flask-App/database/db/eDoctor.db')        
        self.cursor = self.connection.cursor()
        self.cursor.execute(query)
        self.connection.commit()
        self.connection.close()
                                

    ############# Health Sector Management ###########

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


    ########### Appointment Management ###########
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


        




# select_all_users = "SELECT * FROM user WHERE id = 2"
# cursor.execute(select_all_users)

# rows = cursor.fetchone()
# print(rows)


# connection.commit()
# connection.close()