from models.users.user import User

class Specialist(User):
    def __init__(self, name, surname, ID_Number, email, password, contact, type, years_experience):
        super().__init__(name, surname, ID_Number, email, password, contact, type)
        self.years_experience = years_experience


    