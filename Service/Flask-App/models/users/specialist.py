from .user import User


#././Service/Flask-App/database/db/eDoctor.db
class Specialist(User):
    def __init__(self, ID_Number: str, 
                       name,
                       m_name, 
                       surname, 
                       contact, 
                       email, 
                       password, 
                       DOB, 
                       gender, 
                       type, 
                       years_experience,
                       healthSectorID):
        super().__init__(ID_Number, 
                         name,
                         m_name, 
                         surname, 
                         contact, 
                         email, 
                         password, 
                         DOB, 
                         gender, 
                         type)
        self.years_experience = years_experience
        self.accountStatus = "1"
        self.healthSectorID = healthSectorID
        self.qualification = []
        self.expertise = []

    def AddSpecialist(self):
        pass
        


    