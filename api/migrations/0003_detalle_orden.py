# Generated by Django 2.2.13 on 2021-03-30 14:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_carrito_orden_producto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Detalle_orden',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField(default=0)),
                ('precio', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('orden', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ordenDetalle', to='api.Orden')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='productoOrdenDetalle', to='api.Producto')),
            ],
        ),
    ]