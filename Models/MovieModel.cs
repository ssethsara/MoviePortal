using System;

namespace MoviePortal.Models
{
    public class MovieModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Genres { get; set; }
        public DateTime Released_Year { get; set; }
        public double Rating { get; set; }
        public string CoverImage { get; set; }
    }
}