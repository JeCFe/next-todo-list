using MediatR;

namespace Server.Commands;

public static class MediatrRegistrationExtensions
{
    public static void RegisterCommandHandlers<TDbContext>(this IServiceCollection services)
where TDbContext : TodoDb
    {
        foreach (var (type, response) in GetCommands<TDbContext>())
        {
            Type serviceType;
            Type handlerType;

            serviceType = typeof(IRequestHandler<>).MakeGenericType(type);
            handlerType = typeof(CommandHandler<,>).MakeGenericType(typeof(TDbContext), type);

            services.AddTransient(serviceType, handlerType);
        }
    }

    private static IEnumerable<(Type type, Type? response)> GetCommands<TDbContext>()
    {
        foreach (var item in typeof(TDbContext).Assembly.GetExportedTypes())
        {
            if (item.IsAbstract)
            {
                continue;
            }

            foreach (var ginterface in item.GetInterfaces().Where(x => x.IsGenericType))
            {
                if (ginterface.GetGenericTypeDefinition() == typeof(ICommand<>)
                && ginterface.GenericTypeArguments[0] == typeof(TDbContext))
                {
                    yield return (item, null);
                }
                continue;
            }

        }
    }
}

