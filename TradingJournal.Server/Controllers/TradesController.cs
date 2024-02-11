using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradingJournal.Server.Models;

namespace TradingJournal.Server.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TradesController : ControllerBase
  {
    private readonly TradeContext _context;

    public TradesController(TradeContext context)
    {
      _context = context;
    }

    // GET: api/Trades
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Trade>>> GetTrades()
    {
      return await _context.Trades.ToListAsync();
    }

    // GET: api/Trades/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Trade>> GetTrade(int id)
    {
      var trade = await _context.Trades.FindAsync(id);

      if (trade == null)
      {
        return NotFound();
      }

      return trade;
    }

    // PUT: api/Trades/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTrade(int id, Trade trade)
    {
      if (id != trade.ID)
      {
        return BadRequest();
      }

      _context.Entry(trade).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TradeExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Trades
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Trade>> PostTrade(Trade trade)
    {
      _context.Trades.Add(trade);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetTrade", new { id = trade.ID }, trade);
    }

    // DELETE: api/Trades/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrade(int id)
    {
      var trade = await _context.Trades.FindAsync(id);
      if (trade == null)
      {
        return NotFound();
      }

      _context.Trades.Remove(trade);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool TradeExists(int id)
    {
      return _context.Trades.Any(e => e.ID == id);
    }
  }
}
