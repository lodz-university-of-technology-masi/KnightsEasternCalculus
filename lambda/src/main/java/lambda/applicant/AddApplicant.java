package lambda.applicant;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.Applicant;
import util.Response;

public class AddApplicant extends Handler<Applicant> {

    @Override
    public Response handleRequest(Applicant input, Context context) {
        if (input != null) {
            if (input.getId() == null) {
                input.setLastName(input.getLastName().toLowerCase());
                getMapper().save(input);
                return new Response(200, input);
            } else {
                if (getMapper().load(Applicant.class, input.getId()) == null) {
                    input.setLastName(input.getLastName().toLowerCase());
                    getMapper().save(input);
                    return new Response(200, "Applicant added successfully");
                } else return new Response(404, "Applicant was not added");
            }
        } else return new Response(404, "Applicant was not added");
    }
}
