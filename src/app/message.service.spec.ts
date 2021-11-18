import { MessageService } from "./message.service";

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("should add a message", () => {
    service.add("message1");

    expect(service.messages.length).toBe(1);
  });

  it("should remove a message", () => {
    // Arrange
    service.add("message1");
    // Act
    service.clear();
    // Assert
    expect(service.messages.length).toBe(0);
  });
});
