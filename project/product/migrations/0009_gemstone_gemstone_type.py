# Generated by Django 5.2.3 on 2025-07-05 10:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0008_like'),
    ]

    operations = [
        migrations.AddField(
            model_name='gemstone',
            name='gemstone_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='product.gemstonetype'),
        ),
    ]
