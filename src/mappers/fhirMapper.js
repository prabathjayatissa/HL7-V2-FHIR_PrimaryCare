export class FHIRMapper {
  convert(parsedHL7) {
    const resources = [];

    
    if (parsedHL7.patient) {
      resources.push(this.createPatientResource(parsedHL7.patient));
    }

    if (parsedHL7.order) {
      resources.push(this.createServiceRequestResource(parsedHL7.order));
    }

    if (parsedHL7.observations) {
      parsedHL7.observations.forEach(obs => {
        resources.push(this.createObservationResource(obs));
      });
    }

    return {
      resourceType: 'Bundle',
      type: 'collection',
      entry: resources.map(resource => ({ resource }))
    };
  }

  createPatientResource(patient) {
    return {
      resourceType: 'Patient',
      id: patient.id,
      name: [{
        family: patient.name.family,
        given: [patient.name.given, patient.name.middle].filter(Boolean)
      }],
      birthDate: patient.birthDate,
      gender: this.mapGender(patient.gender),
      address: [{
        line: [patient.address.street],
        city: patient.address.city,
        state: patient.address.state,
        postalCode: patient.address.postalCode
      }]
    };
  }

  createServiceRequestResource(order) {
    return {
      resourceType: 'ServiceRequest',
      id: order.id,
      status: this.mapOrderStatus(order.status),
      intent: 'order',
      code: {
        coding: [{
          system: 'http://loinc.org',
          code: order.serviceId
        }]
      },
      authoredOn: order.orderDateTime
    };
  }

  createObservationResource(observation) {
    return {
      resourceType: 'Observation',
      id: observation.id,
      status: this.mapObservationStatus(observation.status),
      code: {
        coding: [{
          system: 'http://loinc.org',
          code: observation.type
        }]
      },
      valueQuantity: {
        value: parseFloat(observation.value),
        unit: observation.unit
      },
      referenceRange: [{
        text: observation.referenceRange
      }]
    };
  }

  mapGender(hl7Gender) {
    const genderMap = {
      'F': 'female',
      'M': 'male',
      'O': 'other',
      'U': 'unknown'
    };
    return genderMap[hl7Gender] || 'unknown';
  }

  mapOrderStatus(hl7Status) {
    const statusMap = {
      'A': 'active',
      'C': 'completed',
      'H': 'on-hold',
      'X': 'cancelled'
    };
    return statusMap[hl7Status] || 'unknown';
  }

  mapObservationStatus(hl7Status) {
    const statusMap = {
      'F': 'final',
      'P': 'preliminary',
      'C': 'corrected',
      'X': 'cancelled'
    };
    return statusMap[hl7Status] || 'unknown';
  }
}
