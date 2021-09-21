from .user import User

class Admin(User):
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
                       employee_number,
                       employeeFrom
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
        self.employee_number = employee_number
        self.employeeFrom = employeeFrom

