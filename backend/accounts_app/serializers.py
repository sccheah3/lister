from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()

from lister_app.models import List


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        write_only_fields = ['password']


    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    lists = serializers.HyperlinkedRelatedField(many=True, view_name='list-detail', queryset=List.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'lists']


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


# class UserSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
#     username = serializers.CharField(max_length=32, validators=[UniqueValidator(queryset=User.objects.all())])
#     password = serializers.CharField(min_length=8, write_only=True)
#     lists = serializers.HyperlinkedRelatedField(many=True, view_name='list-detail', read_only=True)
#
#
#     def create(self, validated_data):
#         user = User.objects.create(username=validated_data['username'], email=validated_data['email'])
#         user.set_password(validated_data['password'])
#         user.save()
#
#         return user
#
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'password', 'lists']