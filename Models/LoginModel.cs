namespace MoviePortal.Models{

    public class LoginModel{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string PictureUrl { get; set; }
        public string Provider { get; set; }
        public string TokenId { get; set; }
    }
}