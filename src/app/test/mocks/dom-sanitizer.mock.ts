export class DomSanitizerMock {
    sanitize = jest.fn().mockReturnValue('safeResourceUrl');
    bypassSecurityTrustResourceUrl = jest.fn().mockReturnValue('safeResourceUrl');
}
