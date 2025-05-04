namespace KPMG_API.Exceptions
{
    public class EntityException : Exception
    {
        private static readonly string message = "Entity error occured";
        public EntityException(Exception innerException) : base(message, innerException)
        {
            
        }
    }
}
