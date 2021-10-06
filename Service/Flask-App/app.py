from logging import DEBUG

from flask.wrappers import Response
from werkzeug.wrappers import response
from models.booking import Booking
from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask import jsonify
from models.users.admin import Admin
from models.users.patient import Patient
from models.users.specialist import Specialist
from database.database import Database
from models.sector import Sector
from models.address import Address
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
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
    def post(self):
        print("Yes")
        data = Database()
        json_data = request.get_json(force=False)
        username = json_data['username']
        password = json_data['password']
        
        itsSector = False

        user = None
        query = "SELECT * FROM User LEFT JOIN Patient ON User.ID_Number = Patient.ID_Number "\
                                   "LEFT JOIN Admin ON User.ID_Number = Admin.ID_Number "\
                                   "LEFT JOIN Specialist ON User.ID_Number = Specialist.ID_Number "\
                                   "WHERE User.Email = '" + (username) + "'"

        user = data.getUser(query)


        if(user == None):
            print("I am in")
            query = "SELECT * FROM Health_Sector WHERE Email='" + (username) + "'"
            user = data.getHealthSector(query)
            itsSector = True


        if (itsSector):
            if user:
                if user[16] == password:
                    _sector = GetSector.get(self,user[0])
                    return _sector
                else:
                    return 1
            else:
                return None
        else:
            if user:
                if user[6] == password:
                    _user = GetUser.get(self, user[0])
                    return _user
                else:
                    return 1
            else:
                return None


        

class Register(Resource):
    def post(self):
        data = Database()
        json_data = request.get_json(force=False)
        _userType = name = json_data['Type']
        _user_ID = json_data['ID_Number']
        _user_Email = json_data['Email']
        UserExist = False
        StatusCode = 0
        response_Message = ""

        users = GetUsers()

        for user in users.get()['Users']:
            if(user['ID_Number'] == _user_ID and user['Email'] == _user_Email):
                UserExist = True
                response_Message = "ID number and email already exists"
            elif(user['ID_Number'] == _user_ID):
                UserExist = True
                StatusCode = 0.1
                response_Message = "ID number already exists"
            elif(user['Email'] == _user_Email):
                UserExist = True
                StatusCode = 0.2
                response_Message = "Email already exists"
    

        if(UserExist):
            return {
                "code": StatusCode,
                "message": response_Message
            }
        else:
            if(_userType == 0): #If admin
                user = Admin(
                        json_data['ID_Number'],
                        json_data['Name'],
                        json_data['Middle_Name'],
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
                user = Patient(
                        json_data['ID_Number'],
                        json_data['Name'],
                        json_data['Middle_Name'],
                        json_data['Surname'],
                        json_data['Contact'],
                        json_data['Email'],
                        json_data['Password'],
                        json_data['DOB'],
                        json_data['Gender'],
                        json_data['Type'],
                        json_data['Longitude'],
                        json_data['Latitude'],
                )
                
                query = "INSERT INTO User VALUES('" + user.ID_Number + "','"\
                                                + user.name + "','"\
                                                + user.middle_name + "','"\
                                                + user.surname + "','"\
                                                + user.contact + "','"\
                                                + user.email + "','"\
                                                + user.password + "','"\
                                                + user.DOB + "','"\
                                                + user.gender + "',"\
                                                + str(user.type) + ","\
                                                + str(user.signup_date) + ",'"\
                                                + "AAAA" + "')"\

                data.RegisterUser(query)
                query = "INSERT INTO Patient VALUES('" + user.ID_Number + "','"\
                                                + str(user.longitude) + "','"\
                                                + str(user.latitude) + "')"
                data.RegisterPatient(query)
            else: #If specialist
                user = Specialist(
                        json_data['ID_Number'],
                        json_data['Name'],
                        json_data['Middle_Name'],
                        json_data['Surname'],
                        json_data['Contact'],
                        json_data['Email'],
                        json_data['Password'],
                        json_data['DOB'],
                        json_data['Gender'],
                        json_data['Type'],
                        json_data['YearsExperience'],
                        json_data['HealthSectorID']
                )
                
                query = "INSERT INTO User VALUES('" + user.ID_Number + "','"\
                                                + user.name + "','"\
                                                + user.middle_name + "','"\
                                                + user.surname + "','"\
                                                + user.contact + "','"\
                                                + user.email + "','"\
                                                + user.password + "','"\
                                                + user.DOB + "','"\
                                                + user.gender + "','"\
                                                + str(user.type) + "','"\
                                                + str(user.signup_date) + "','"\
                                                + "AAAA" + "')"\
                                                        
                data.RegisterUser(query)
                
                query = "INSERT INTO Specialist VALUES('" + user.ID_Number + "','"\
                                                          + user.years_experience + "','"\
                                                          + user.accountStatus + "','"\
                                                          + user.healthSectorID + "')"\
                                                              
                data.RegisterSpecialist(query)

            return {
                "code": 1,
                "message": "user registered successfully"
            } # User registered successfully


class UpdatePassword(Resource):
    def put(self):
        data = Database()
        json_data = request.get_json(force=False)
        user_ID = json_data["ID_Number"]
        new_password = json_data["Password"] 
        query = "UPDATE User SET Password='" + new_password + "' WHERE ID_Number='" + user_ID + "';"
        data.User_update_password(query)
        return 1


class UpdateUser(Resource): #Name. Middle name, Surname, contact, email
    def put(self):
        data = Database()
        json_data = request.get_json(force=False)
        user_ID = json_data["ID_Number"]
        name = json_data["Name"]
        m_name = json_data["M_Name"]
        surname = json_data["Surname"]
        contact = json_data["Contact"]
        email = json_data["Email"]

        query = "UPDATE User SET Name='" + name + "',"\
                                "M_Name='" + m_name + "',"\
                                "Surname='" + surname + "',"\
                                "Contact='" + contact + "',"\
                                "Email='" + email + "' WHERE ID_Number='" + user_ID + "';"
        
        data.updateUser(query)

        return GetUser.get(self,user_ID)




class GetUser(Resource):
    def get(self, user_id):
        response = []
        data = Database()
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
                user['AccountStatus'] = _user[20]
                user['HealthSectorID'] = _user[21]

            response.append(user)
            return response[0]
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
                    user['AccountStatus'] = _user[20]
                    user['HealthSectorID'] = _user[21]

                response['Users'].append(user)
            return response
        else:
            return rows


###########  Sectors Service  ###############

class RegisterSector(Resource):
    def post(self):
        data = Database()
        json_data = request.get_json(force=False)
        sectors = GetSectors().get()
        SectorExists = False
        
        for _sector in sectors:
            if _sector['Email'] == json_data['Email']:
                SectorExists = True
        
        if SectorExists:
            return {
                "code": 0,
                "message": "Email already exists"
            }
        else:
            sector = Sector(json_data['Name'],
                            json_data['Owner'],
                            json_data['Website'],
                            json_data['Address'],
                            json_data['Longitude'],
                            json_data['latitude'],
                            json_data['B_Hours_Open'],
                            json_data['B_Hours_Close'],
                            json_data['Founded'],
                            json_data['Description'],
                            json_data['ConsultationFee'],
                            json_data['Contact'],
                            json_data['Email'],
                            json_data['Password'])
            

            query = "INSERT INTO Health_Sector( Name,"\
                                                "Owner,"\
                                                "Website,"\
                                                "Address,"\
                                                "Longitude,"\
                                                "latitude,"\
                                                "B_Hours_Open,"\
                                                "B_Hours_Close,"\
                                                "Founded,"\
                                                "Description,"\
                                                "isActive,"\
                                                "ConsultationFee,"\
                                                "Contact,"\
                                                "Email,"\
                                                "Approved,"\
                                                "Password)"\
                                            + "VALUES('" + sector.name + "','"\
                                                        + sector.owner + "','"\
                                                        + sector.website_url + "','"\
                                                        + sector.address + "','"\
                                                        + sector.longitude + "','"\
                                                        + sector.latitude + "','"\
                                                        + sector.b_h_open + "','"\
                                                        + sector.b_h_close + "','"\
                                                        + sector.founded + "','"\
                                                        + sector.description + "','"\
                                                        + sector.isActive + "','"\
                                                        + sector.consultationFee + "','"\
                                                        + sector.contact + "','"\
                                                        + sector.email + "','"\
                                                        + sector.aproval + "','"\
                                                        + sector.password + "')"
            data.AddHealthSector(query) 
 

            query = "SELECT * FROM Health_Sector WHERE Email='" + json_data['Email'] + "'"
            id = data.getHealthSector(query)

            SectorAddress = Address(json_data['Country'],
                            json_data['Street_Address'],
                            json_data['Suburb'],
                            json_data['City'],
                            json_data['Postal_Code'])
            
            query = "INSERT INTO Address(country, Street, Suburb, City, Postal_Code, HealthSectorID) "\
                               +"VALUES ('" + SectorAddress.Country + "','"\
                                            + SectorAddress.Street + "','"\
                                            + SectorAddress.Suburb + "','"\
                                            + SectorAddress.City + "','"\
                                            + SectorAddress.Postal_Code + "','"\
                                            + str(id[0]) + "')"
            data.RegisterAddress(query)
            return {
                "code": 1,
                "message": "register successfully"
            }

class GetSectors(Resource):
    def get(self):
        response = []
        data = Database()
        query = "SELECT * FROM Health_Sector"
        sectors = data.getHealthSectors(query)

        if(sectors):
            for sector in sectors:
                _sector = { 
                    "ID_Number": sector[0],   
                    "Name": sector[1],
                    "Owner": sector[2],
                    "Website": sector[3],
                    "Address": sector[4],
                    "Longitude": sector[5],
                    "latitude": sector[6],
                    "B_Hours_Open": sector[7],
                    "B_Hours_Close": sector[8],
                    "Founded": sector[9],
                    "Description": sector[10],
                    "isActive": sector[11],
                    "ConsultationFee": sector[12],
                    "Contact": sector[13],
                    "Email": sector[14],
                    "Aproval": sector[15],
                    "Password": sector[16]
                }
                response.append(_sector)
        
        return response
                
class GetActiveSectors(Resource):
    def get(self):
        sectors = GetSectors().get()
        response = []
        for sector in sectors:
            if sector['isActive'] == (1) and sector['Aproval'] == 1:
                response.append(sector)
        
        if sectors and response != []:
            return response
        else:
            return None

class GetRejectectedSectors(Resource):
    def get(self):
        sectors = GetSectors().get()
        response = []
        for sector in sectors:
            if sector['Aproval'] == 3:
                response.append(sector)
        
        if sectors and response != []:
            return response
        else:
            return None

class RespondSectorApplication(Resource):
    def put(self, sector_id):
        pass


class GetSector(Resource):
    def get(self, sector_id):
        response = []
        data = Database()
        query = "SELECT * FROM Health_Sector WHERE id=" + str(sector_id)

        sector = data.getHealthSector(query)
        if sector:
            _sector = {
                "ID_Number": sector[0],
                "Name": sector[1],
                "Owner": sector[2],
                "Website": sector[3],
                "Address": sector[4],
                "Longitude": sector[5],
                "Latitude": sector[6],
                "B_Hours_Open": sector[7],
                "B_Hours_Close": sector[8],
                "Founded": sector[9],
                "Description": sector[10],
                "isActivate": sector[11],
                "ConsultationFee": sector[12],
                "Contact": sector[13],
                "Email": sector[14],
                "Aproval": sector[15],
                "Password": sector[16]
            }
            return _sector
        else:
            return None




###########  Specialists Service  ###############

class GetSectorSpecialists(Resource):
    def get(self, sector_id):
        users = GetUsers().get()["Users"]
        response = []
        for user in users:
            if user["Type"] == (2):
                if user["HealthSectorID"] == sector_id:
                    response.append(GetUser().get(user['ID_Number']))

        if response == []:
            return None
        return response

class GetSpecialists(Resource):
    def get(self):
        users = GetUsers().get()["Users"]
        response = []
        for user in users:
            if user["Type"] == (2):
                response.append(GetUser().get(user['ID_Number']))

        if response == []:
            return None
        return response
        
class GetActiveSpecialists(Resource):
    def get(self, sector_id):
        users = GetUsers().get()["Users"]
        response = []
        for user in users:
            if user["Type"] == (2) and user["AccountStatus"] == (1) and user["HealthSectorID"] == sector_id:
                response.append(GetUser().get(user['ID_Number']))

        if response == []:
            return None
        return response


class GetSpecialist(Resource):
    def get(self, specialist_id):
        pass



########## Bookings ###############

#subject, description, date, duration, patient_id, specialist_id
class BookSpecialist(Resource):
    def post(self):
        data = Database()
        json_data = request.get_json(force=False)
        appointment = Booking(
            json_data['Subject'],
            json_data['Description'],
            json_data['Date'],
            json_data['Duration'],
            json_data['Patient_ID'],
            json_data['Specialist_ID']
        )

        query = "INSERT INTO Appointment(Subject,"\
                                        "Description,"\
                                        "AppDate,"\
                                        "Duration,"\
                                        "DateCreated,"\
                                        "Status,"\
                                        "PatientID,"\
                                        "SpecialistID)"\
                                        "VALUES('" + appointment.subject + "','"\
                                                   + appointment.description + "','"\
                                                   + appointment.date + "','"\
                                                   + appointment.duration + "','"\
                                                   + appointment.dateCreated + "','"\
                                                   + appointment.status + "','"\
                                                   + appointment.patient_id + "','"\
                                                   + appointment.specialist_id + "')"\
                                                    
        
        data.BookAppointment(query)
        return {
            "code": 1,
            "message": "Booking sent"
        }
                                                  

class GetAppointments(Resource):
    def get(self):
        response = {'bookings': []}
        data = Database()######change this one, replace it with sqlalchemy methods
        query = "SELECT * FROM Appointment"
        bookings = data.getAppoitnments(query)
        response = []

        if bookings:
            for booking in bookings:
                _booking = {
                    "id": booking[0],
                    "Subject": booking[1],
                    "Description": booking[2],
                    "Date": booking[3],
                    "Duration": booking[4],
                    "DateCreated": booking[5],
                    "Status": booking[6],
                    "PatientID": booking[7],
                    "SpecialistID": booking[8]
                }

                response.append(_booking)
            return response
        else:
            return None


class GetUserAppointments(Resource):
    #Use specialistID || patientID, so that it gets pulled to their booking
    #if the status of booking is declined, show it only to patients not on doctors side
    #if status is 0. From specialist side, return null

    def get(self, user_id): #I have to add get user here
        response = {'bookings': []}
        data = Database()######change this one, replace it with sqlalchemy methods
        bookings = GetAppointments.get(self)
        response = []

        if bookings:
            for booking in bookings:
                if booking["SpecialistID"] == str(user_id) or booking["PatientID"] == str(user_id):
                    response.append(booking)

        if response == []:
            return None
        else:
            return response
            
        
        


            


class BookingResponse(Resource):
    #Match look for this specialist ID in the database table, if found pull it and update it.
    def put(self, specialistID, status):
        pass




api.add_resource(hello,'/')
api.add_resource(Login,'/login')
api.add_resource(UpdatePassword, '/updatepassword')
api.add_resource(UpdateUser, '/updateuser')
api.add_resource(GetAppointments, '/appointments') #get all bookings
api.add_resource(GetUserAppointments, '/appointments/<string:user_id>')
api.add_resource(BookSpecialist, '/bookappointment') # book specialist
api.add_resource(GetUsers, '/users') #get all users
api.add_resource(GetUser, '/user/<string:user_id>') # get one user of given id
api.add_resource(Register, '/registeruser') #Register user
api.add_resource(RegisterSector, '/registersector') #Register a sector
api.add_resource(GetSectors, '/sectors') #get all sectors
api.add_resource(GetSector, '/sector/<string:sector_id>') #get one sector
api.add_resource(GetSectorSpecialists, '/sectorspecialists/<int:sector_id>') # get specialists of given sector -> by sector
api.add_resource(GetSpecialists, '/specialists') #Get all specialists
api.add_resource(GetActiveSectors, '/activesectors') #Get active sectors
api.add_resource(GetRejectectedSectors, '/rejectedsectors') #Get rejected specialist ->by Admin
api.add_resource(GetActiveSpecialists, '/activesectorspecialists/<int:sector_id>') #get active specialists of sector -> By patient and health sector admin 

app.run(port=5000)