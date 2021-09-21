from abc import ABC
import datetime

class User(ABC):
    def __init__(self, name,middle_name,gender, DOB,surname, ID_Number, email, password, contact, type):
        self.name = name
        self.surname = surname
        self.middle_name = middle_name
        self.ID_Number = ID_Number
        self.email = email
        self.password = password
        self.contact = contact
        self.DOB = DOB
        self.gender = gender
        self.type = type
        self.resetcode = ''
        self.signup_date = datetime.datetime.now()

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