# step18_simple_queue_service

- It works similar to the event bridge,
- It can be used as the dead letter queue - for it as a failure so we use sqs -simple queue service.
- Difference between sns and sqs is basically sqs has queue , while sns has topics.
- Its the smaller version of event bridge as there is queue and it sends the messages to the different services
- There is a queue and it gets the messages in the queue and after that the messages will not be lost as it works asynchronously.
- It is used as a buffer and as a queue so that the events can be fired to the queue and consumer then needs to pull the events from over there .
