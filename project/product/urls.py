from django.urls import path
from .views import  AddGemstoneDataView,GemstoneCreateView,GemstoneVariantCreateView ,GetGemstoneVariantView,CategoryCreateView,AddRudrakshaView,GetSpecificRudrakshaView,GetRudrakshaListView, AddBraceletView,DeleteRudrakshaByNameView,GetBraceletByNameView,GetAllBraceletsView,GlobalSearchView,GetExactGemstoneView

urlpatterns = [
     path('gemstone/create/',  GemstoneCreateView.as_view(), name='create-gemstone'),
    path('gemstone-variant/create/', GemstoneVariantCreateView.as_view(), name='create-gemstone-variant'),
     path('get-gemstone-variant/', GetGemstoneVariantView.as_view(), name='get_gemstone_variant'),
    path('get-exact-gemstone/', GetExactGemstoneView.as_view(), name='get_exact_gemstone'),
   path("create-category/", CategoryCreateView.as_view(), name="create_category"),
   path('rudraksha-product/', AddRudrakshaView.as_view(), name='upload_product'),
    path('rudraksha/', GetRudrakshaListView.as_view(), name='rudraksha-list'),
   path('rudraksha/<str:mukhi_name>/', GetSpecificRudrakshaView.as_view(), name='rudraksha-detail'),
   path('add-bracelet/', AddBraceletView.as_view(), name='add_bracelet'),
   #  path('delete-rudraksha/', DeleteRudrakshaByNameView.as_view(), name='delete_rudraksha'),
   path('bracelet/', GetAllBraceletsView.as_view(), name='get_bracelet_by_name'),
      path('bracelet/<str:name>/', GetBraceletByNameView.as_view(), name='bracelet-by-name'),
      path('search/', GlobalSearchView.as_view(), name='global-search'),
        path('add-gemstone-data/', AddGemstoneDataView.as_view(), name='add_gemstone_data'),

]
