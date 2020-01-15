package lambda.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.TestInstance;
import util.Response;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetTestInstancesForUser extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Map<String, AttributeValue> attributeValues = new HashMap<>();
        attributeValues.put(":id", new AttributeValue().withS(input));

        DynamoDBQueryExpression<TestInstance> query = new DynamoDBQueryExpression<TestInstance>()
                .withKeyConditionExpression("applicantId = :id")
                .withExpressionAttributeValues(attributeValues);

        List<TestInstance> tab = getMapper().query(TestInstance.class, query);

        for (int i = 0; i < tab.size(); i++) {
            if (tab.get(i).getCloseQuestions() != null) {
                for (int j = 0; j < tab.get(i).getCloseQuestions().size(); j++) {
                    tab.get(i).getCloseQuestions().get(j).setCorrectAnswers(new ArrayList<>());
                }
            } else {
                tab.get(i).setOpenQuestions(new ArrayList<>());
            }
            if (tab.get(i).getOpenQuestions() != null) {
                for (int j = 0; j < tab.get(i).getOpenQuestions().size(); j++) {
                    tab.get(i).getOpenQuestions().get(j).setCorrectAnswer("");
                }
            } else {
                tab.get(i).setOpenQuestions(new ArrayList<>());
            }
            if (tab.get(i).getValueQuestions() != null) {
                for (int j = 0; j < tab.get(i).getValueQuestions().size(); j++) {
                    tab.get(i).getValueQuestions().get(j).setCorrectAnswer(0f);
                }
            } else {
                tab.get(i).setValueQuestions(new ArrayList<>());
            }
        }

        return new Response(200, tab);
    }
}
