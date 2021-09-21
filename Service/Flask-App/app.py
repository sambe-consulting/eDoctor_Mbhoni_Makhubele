from logging import DEBUG
from models.booking import Booking
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask import jsonify
from models.users.admin import Admin
from models.users.patient import Patient
from models.users.specialist import Specialist

from database.database import Database



app = Flask(__name__)
api = Api(app)
app.config['DEBUG']=True

class hello(Resource):  
    response = {'User': []}
    def post(self):
        json_data = request.get_json(force=False)
        name = json_data['name']
        
        return {'qq': name }
        

########## user management #################

class Login(Resource):
    def get(self, email, password):
        pass

class Register(Resource):



    def post(self):
        data = Database()
        json_data = request.get_json(force=False)
        _userType = name = json_data['Type']
        _user_ID = json_data['ID_Number']

        #users = GetUsers()



        if(_userType == 0): #If admin
            user = Admin(
                    json_data['ID_Number'],
                    json_data['Name'],
                    json_data['M_Name'],
                    json_data['Surname'],
                    json_data['Contact'],
                    json_data['Email'],
                    json_data['Password'],
                    json_data['DOB'],
                    json_data['Gender'],
                    json_data['Type'],
                    json_data['EmployeeNumber'],
                    json_data['EmployeeFrom'],
            )
            
            query = "INSERT INTO User VALUES('" + user.ID_Number + "','"\
                                               + user.name + "','"\
                                               + user.middle_name + "','"\
                                               + user.surname + "','"\
                                               + user.contact + "','"\
                                               + user.email + "','"\
                                               + user.password + "',"\
                                               + user.DOB + ",'"\
                                               + user.gender + "',"\
                                               + str(user.type) + ","\
                                               + str(user.signup_date) + ",'"\
                                               + "AAAA" + "')"\
                                                       
            data.RegisterUser(query)
            query = "INSERT INTO Admin VALUES('" + user.ID_Number + "','"\
                                          + user.employee_number + "','"\
                                          + user.employeeFrom + "')"
            data.RegisterAdmin(query)
          
            
                                            
        elif(_userType == 1): #If patient
            user = Patient()
            qery = "INSERT INTO User VALUES(" + user.ID_Number + ","\
                                            + user.name + ","\
                                            + user.middle_name + ","\
                                            + user.surname + ","\
                                            + user.contact + ","\
                                            + user.email + ","\
                                            + user.password + ","\
                                            + user.DOB + ","\
                                            + user.gender + ","\
                                            + user.type + ","\
                                            + user.signup_date + ","\
                                            + user.resetcode + ")"
        else: #If specialist
            user = Specialist()
            qery = "INSERT INTO User VALUES(" + user.ID_Number + ","\
                                            + user.name + ","\
                                            + user.middle_name + ","\
                                            + user.surname + ","\
                                            + user.contact + ","\
                                            + user.email + ","\
                                            + user.password + ","\
                                            + user.DOB + ","\
                                            + user.gender + ","\
                                            + user.type + ","\
                                            + user.signup_date + ","\
                                            + user.resetcode + ")"
        

        return {'quey': query}
                                          


class GetUser(Resource):
    def get(self, user_id):
        response = []
        data = Database()
        #query = "SELECT * FROM User LEFT JOIN Patient ON User.ID_Number = Patient.ID_Number LEFT JOIN Admin ON User.ID_Number = Admin.ID_Number LEFT JOIN Specialist ON User.ID_Number = Specialist.ID_Number WHERE User.ID_Number ='"+ (user_id) + "'"
        
        query = "SELECT * FROM User LEFT JOIN Patient ON User.ID_Number = Patient.ID_Number "\
                                   "LEFT JOIN Admin ON User.ID_Number = Admin.ID_Number "\
                                   "LEFT JOIN Specialist ON User.ID_Number = Specialist.ID_Number "\
                                   "WHERE User.ID_Number = '" + (user_id) + "'"


        

        _user = data.getUser(query)
        #return len(rows)
        if(_user):
            user = {
                'ID_Number': _user[0],
                'Name': _user[1],
                'Middle_Name': _user[2],
                'Surname': _user[3],
                'Contact': _user[4],
                'Email': _user[5],
                'Password': _user[6],
                'DOB': _user[7],
                'Gender': _user[8],
                'Type': _user[9],
                'Signup_Date': _user[10],
                'Rest_Code': _user[11]
            }

            if(user['Type'] == 0): # Admin
                user['Employee_Number'] = _user[16]
                user['DateEmployed'] = _user[17]
                
            elif(user['Type'] == 1): # Patient
                user['Longitude'] = _user[13]
                user['Latitude'] = _user[14]

            else: # Specialist
                user['Years_experience'] = _user[19]

            response.append(user)
            return response
        else:
            return _user


class GetUsers(Resource):
    
    def get(self):
        response = {'Users': []}
        data = Database()
        query = "SELECT * FROM User LEFT JOIN Patient ON User.ID_Number = Patient.ID_Number "\
                                   "LEFT JOIN Admin ON User.ID_Number = Admin.ID_Number "\
                                   "LEFT JOIN Specialist ON User.ID_Number = Specialist.ID_Number"
        rows = data.getUsers(query)
        #return len(rows)
        if(rows):
            for _user in rows:
                user = {
                    'ID_Number': _user[0],
                    'Name': _user[1],
                    'Middle_Name': _user[2],
                    'Surname': _user[3],
                    'Contact': _user[4],
                    'Email': _user[5],
                    'Password': _user[6],
                    'DOB': _user[7],
                    'Gender': _user[8],
                    'Type': _user[9],
                    'Signup_Date': _user[10],
                    'Rest_Code': _user[11]
                }

                if(user['Type'] == 0): # Admin
                    user['Employee_Number'] = _user[16]
                    user['DateEmployed'] = _user[17]
                    
                elif(user['Type'] == 1): # Patient
                    user['Longitude'] = _user[13]
                    user['Latitude'] = _user[14]

                else: # Specialist
                    user['Years_experience'] = _user[19]

                response['Users'].append(user)
            return response
        else:
            return rows


###########  Sectors Service  ###############

class RegisterSector(Resource):
    def post(self):
        pass

class GetSectors(Resource):
    def get(self):
        pass

class GetSector(Resource):
    def get(self, sector_id):
        pass


###########  Specialists Service  ###############

class RegisterSpecialist(Resource):
    def post(self, sector_id):
        pass

class GetSpecialists(Resource):
    def get(self):
        pass

class GetSpecialist(Resource):
    def get(self, specialist_id):
        pass



########## Bookings ###############

class BookSpecialist(Resource):
    def post(self):
        return {'message': 'Booking sent'}

class getAllBookings(Resource):
    def get(self):
        response = {'bookings': []}
        data = Database()
        bookings = data.createBooking()
        for booking in bookings:
            if isinstance(booking, Booking):
                response['bookings'].append({
                'name': booking.name,
                'description': booking.description,
                'date': booking.date,
                'duration': booking.duration,
                'specialistID': booking.specialist_id,
                'patientID': booking.patient_id,
                'dateCreated': booking.dateCreated,
                'status': booking.status,
            })

class GetBookings(Resource):
    #Use specialistID || patientID, so that it gets pulled to their booking
    #if the status of booking is declined, show it only to patients not on doctors side
    #if status is 0. From specialist side, return null

    def get(self, user_id): #I have to add get user here
        response = {'bookings': []}
        data = Database()######change this one, replace it with sqlalchemy methods
        bookings = data.createBooking()
        for booking in bookings:
            if isinstance(booking, Booking):
                if(str(user_id) == booking.specialist_id and booking.status == 0):
                    response['bookings'].append({
                    'name': booking.name,
                    'description': booking.description,
                    'date': booking.date,
                    'duration': booking.duration,
                    'specialistID': booking.specialist_id,
                    'patientID': booking.patient_id,
                    'dateCreated': booking.dateCreated,
                    'status': booking.status,
                })
        
        return response


            


class BookingResponse(Resource):
    #Match look for this specialist ID in the database table, if found pull it and update it.
    def put(self, specialistID, status):
        pass




api.add_resource(hello,'/')
api.add_resource(GetBookings, '/booking/<string:user_id>')
api.add_resource(BookSpecialist, '/bookAppointment')
api.add_resource(GetUsers, '/Users')
api.add_resource(GetUser, '/User/<string:user_id>')
api.add_resource(Register, '/RegisterUser')

app.run(port=5000)