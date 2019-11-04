package model;

import java.util.Date;
import java.util.List;

public class Candidate extends User {
    private List<Experience> experiences;

    public Candidate(String id, String firstName, String lastName, Date dateOfBirth, String address, String city,
                     String postalCode, String email, String phoneNumber, List<Experience> experiences) {
        super(id, firstName, lastName, dateOfBirth, address, city, postalCode, email, phoneNumber);
        this.experiences = experiences;
    }

    public List<Experience> getExperiences() {
        return experiences;
    }

    public void setExperiences(List<Experience> experiences) {
        this.experiences = experiences;
    }
}
