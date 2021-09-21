from abc import ABC
import datetime

class User(ABC):
    def __init__(self, ID_Number, 
                         name,
                         m_name, 
                         surname, 
                         contact, 
                         email, 
                         password, 
                         DOB, 
                         gender, 
                         type):
        self.name = name
        self.surname = surname
        self.middle_name = m_name
        self.ID_Number = ID_Number
        self.email = email
        self.password = password
        self.contact = contact
        self.DOB = DOB
        self.gender = gender
        self.type = type
        self.resetcode = ''
        self.signup_date = datetime.date.today()

        #User Types
        # 0 Admin
        # 1 Patient
        # 2 Specialist


    ######### Setters ########
    @property
    def setName(self, name):
        self.name = name

    @property
    def setSurname(self, surname):
        self.surname = surname

    @property
    def changePassword(self, newPassword):
        self.password = newPassword

    @property
    def setContact(self, contact):
        self.contact = contact


    ########## Getters ########
    @property
    def getID_Number(self):
        return self.ID_Number

    @property
    def getName(self):
        return self.name

    @property
    def getSurname(self):
        return self.surname

    @property
    def getEmail(self):
        return self.email

    @property
    def getPassword(self):
        return self.password

    @property
    def getContact(self):
        return self.contact

    @property
    def getType(self):
        return self.type
    
    @property
    def getSignupDate(self):
        return self.signup_date