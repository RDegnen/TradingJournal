﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TradingJournal.Server.Models;

#nullable disable

namespace TradingJournal.Server.Migrations
{
    [DbContext(typeof(TradeContext))]
    [Migration("20240210185942_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.1");

            modelBuilder.Entity("TradingJournal.Server.Models.Trade", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Direction")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Entry")
                        .HasColumnType("REAL");

                    b.Property<DateTime>("EntryTime")
                        .HasColumnType("TEXT");

                    b.Property<double?>("Exit")
                        .HasColumnType("REAL");

                    b.Property<DateTime?>("ExitTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Notes")
                        .HasColumnType("TEXT");

                    b.Property<string>("Pair")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("PositionSize")
                        .HasColumnType("INTEGER");

                    b.Property<double?>("ProfitOrLoss")
                        .HasColumnType("REAL");

                    b.Property<double>("RiskPercent")
                        .HasColumnType("REAL");

                    b.Property<string>("RiskReward")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<double>("StopLoss")
                        .HasColumnType("REAL");

                    b.Property<string>("Strategy")
                        .HasColumnType("TEXT");

                    b.Property<double>("TakeProfit")
                        .HasColumnType("REAL");

                    b.HasKey("ID");

                    b.ToTable("Trades");
                });
#pragma warning restore 612, 618
        }
    }
}