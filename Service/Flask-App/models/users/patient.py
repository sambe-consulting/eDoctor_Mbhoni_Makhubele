from .user import User

class Patient(User):
    def __init__(self, name, surname, ID_Number, email, password, contact, type):
        super().__init__(name, surname, ID_Number, email, password, contact, type)
        


        