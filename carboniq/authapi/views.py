from rest_framework import generics
from .serializers import LoginSerializer, UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def login_user(request):
    """
    Handle user login, validate credentials, and return token on success.
    """
    # Use the LoginSerializer to validate the request data
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generate a token for the authenticated user
            try:
                token, created = Token.objects.get_or_create(user=user)

                # Return the token if the user is authenticated
                return Response({
                    "message": "Login successful",
                    "token": token.key
                }, status=status.HTTP_200_OK)
            except Exception as e:
                # Handle database errors or other unforeseen errors
                return Response({
                    "error": f"An error occurred while generating token: {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            # Invalid credentials case
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    # If the serializer is invalid (missing username or password)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)