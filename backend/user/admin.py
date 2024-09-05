from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Tickets

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'username', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('is_superuser', 'is_staff', 'is_active')
    search_fields = ('email', 'username')
    ordering = ('email',)
    filter_horizontal = ()
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_superuser', 'is_staff', 'is_active')}),
        
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser'),
        }),
    )



class TicketsAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'priority', 'status', 'created_at')
    list_filter = ('priority', 'status', 'user')
    search_fields = ('title', 'description', 'user__email')
    ordering = ('-created_at',)







admin.site.register(User, UserAdmin)
admin.site.register(Tickets, TicketsAdmin)

