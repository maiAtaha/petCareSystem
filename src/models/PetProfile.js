class PetProfile {
  constructor(petId, name,birthDate,species, breed,wight, allergies,gender, imageUrl) {
    this.petId = petId;
    this.name = name;
    this.birthDate = birthDate;
    this.species = species;
    this.breed = breed;
    this.wight = wight;
    this.allergies = allergies;
    this.gender = gender;
    this.imageUrl = imageUrl;
  }
}
module.exports = PetProfile;
