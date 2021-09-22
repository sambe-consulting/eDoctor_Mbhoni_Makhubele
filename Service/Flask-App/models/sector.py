#from users.specialist import Specialist

class Sector:
    def __init__(self, name, 
                       owner, 
                       website_url, 
                       address, 
                       longitude, 
                       latitude, 
                       b_h_open, 
                       b_h_close, 
                       founded, 
                       description,
                       isActive,
                       consultationFee,
                       contact,
                       email,
                       password):
        self.name = name
        self.owner = owner
        self.website_url = website_url
        self.address = address
        self.longitude = longitude
        self.latitude = latitude
        self.b_h_open = b_h_open
        self.b_h_close = b_h_close
        self.founded = founded
        self.description = description
        self.isActive = isActive
        self.consultationFee = consultationFee
        self.contact = contact
        self.email = email
        self.password = password
        self.specialists: list = []

    # def RegisterSpecialist(self, specialist: Specialist):
    #     self.specialists.append(specialist)

    # def getSpecialists(self):
    #     return self.specialists


    #setters
    def setName(self, name):
        self.name = name
    
    def setOwner(self, owner):
        self.owner = owner
    
    def setWebsite_url(self, url):
        self.website_url = url

    def setAddress(self, address):
        self.address = address

    def setLongitude(self, longitude):
        self.longitude = longitude
    
    def setLatitude(self, latitude):
        self.latitude = latitude
    
    def setBusinessHourseOpening(self, opening_time):
        self.b_h_open = opening_time

    def setBusinessHourseClose(self, closing_time):
        self.b_h_close = closing_time

    def setWhenFound(self, founded):
        self.founded = founded

    def setDescription(self, description):
        self.description = description


    def addSpecialist(self, specialist):
        self.specialists.append(specialist)


    #getters
    def getName(self):
        return self.name

    def getOwner(self):
        return self.owner

    def getWebsite(self):
        return self.website_url
    
    def getAddress(self):
        return self.address
    
    def getLongitude(self):
        return self.longitude

    def getLatitude(self):
        return self.latitude

    def getBusinessHourseOpening(self):
        return self.b_h_open
    
    def getBusinessHourseClose(self):
        return self.b_h_close

    def getWhenFound(self):
        return self.founded

    def getDesctription(self):
        return self.des

        

