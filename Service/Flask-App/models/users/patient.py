from .user import User

class Patient(User):
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
                       longitude,
                       latitude
                       ):
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
        self.longitude = longitude
        self.latitude = latitude
        


        