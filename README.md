HL7-V2-FHIR_PrimaryCare

I've created a comprehensive HL7 v2 to FHIR mapping solution specifically for primary care practice data. 

Here's what's included:
 
 HL7 Parser: Handles parsing of PID (Patient), OBR (Order), and OBX (Observation) segments
 FHIR Mapper: Converts parsed HL7 data to FHIR resources (Patient, ServiceRequest, Observation)
 Express Server: REST API endpoint for conversion
 Test Suite: Comprehensive tests for both parser and mapper


To use the converter:

  Send HL7 v2 messages as POST requests to /convert
  Receive FHIR Bundle containing converted resources
  The server is now running on port 3000. 
  You can test it by sending HL7 v2 messages to http://localhost:3000/convert.


Need any specific mapping rules or additional segments supported?

