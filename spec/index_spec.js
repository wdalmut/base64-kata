base64 = require('../');

String.prototype.fromBase64 = base64.fromBase64;
String.prototype.toBase64 = base64.toBase64;

describe("Base64", function() {
  it("should encode strings", function() {
    expect('this is a string!!'.toBase64()).toEqual('dGhpcyBpcyBhIHN0cmluZyEh');
  });

  it("should manage pad", function() {
    expect('z'.toBase64()).toEqual('eg==');
  });

  it("should manage pad during decode", function() {
    expect('eg=='.fromBase64()).toEqual('z');
  });

  it("should decode", function() {
    expect('dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64()).toEqual('this is a string!!');
  });
});

